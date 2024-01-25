const Employee = require('../db/employee')

// Send all the data to the clinet
const getEmployeeData = async (req,res,next) =>{
    try{
        const data = await Employee.findAll();
        res
        .status(200)
        .json(data)
    }catch(err){
        console.log("Error Sending Data!!");
    }
}

// Add details of an employee to the db
const addEmployee = async(req,res,next) =>{
    try{
        const { first_name, last_name , email, employeeId, number } = req.body;
        
        const user = {
            first_name : first_name,
            last_name : last_name,
            email : email,
            employeeId : employeeId,
            number : number
        }

        const employeeIdExists = await Employee.findAll({where : {employeeId : employeeId}})
        const emailExists = await Employee.findAll({where : { email : email }})

        console.log(employeeIdExists, "  ", emailExists)

        if(employeeIdExists.length === 0 && emailExists.length === 0){
            const response = await Employee.create(user)
            return res
            .status(200)
            .json({msg : "Employee Created Succesfully!!"})
        }

        return res.status(409).json({msg : `Employee already exists`})

        
    }catch(err){
        res.status(409).json({
            "error" : "Conflict"
        })
    }
}

//Edit Details of the employee with id
const editEmployeeData = async(req,res,next) =>{
    try{
        const { id, first_name, last_name, email, employeeId, number } = req.body;
        
        const updatedObject = {}

        if(first_name !== ""){
            updatedObject.first_name = first_name;
        }
        if(last_name !== ""){
            updatedObject.last_name = last_name;
        }
        if(email !== ""){
            updatedObject.email = email;
        }
        if(employeeId !== ""){
            updatedObject.employeeId = employeeId;
        }
        if(number !== ""){
            updatedObject.number = number;
        }

        const [updatedRowsCount, updatedRows] = await Employee.update(
            updatedObject,
            { where: { id: id } }
        );

        if(updatedRowsCount > 0){
            return res
                .status(200)
                .json({"msg" : "Employee Data Edited Succesfully!!"});
        }
    
        return res
            .status(404)
            .json({"msg" : "Employee Not Found!!"})

    }catch(err){
        
        return res
            .status(500)
            .json({msg : "Internal Server Error!!"})
    }
}

//Delete the details of an employee 
const deleteEmployeeData = async (req, res, next) => {
    try {
        const { employeeId } = req.body;

        const response = await Employee.destroy({
            where: { employeeId: employeeId }
        });

        if (response > 0) {
            return res.status(200).json({ msg: `The employee with ID ${employeeId} deleted successfully!!` });
        }

        res.status(200).json({ msg: `No rows deleted. Row with ID ${employeeId} not found.` });
    } catch (err) {
        console.error('Error deleting row:', err);
        return res.status(500).json({ msg: "Error in Deleting Row!! Internal Server Error!!" });
    }
}

module.exports = {
    getEmployeeData,
    addEmployee,
    editEmployeeData,
    deleteEmployeeData
}