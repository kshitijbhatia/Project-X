const Employee = require('../db/employee');

const searchFunction = async (inputData) => {
    const employees = await Employee.findAll();

    let matchingEmployees = new Map();

    for (let i = 0; i < employees.length; i++) {
        const employee = employees[i].dataValues;

        for (const key in employee) {
            let lowerInputData = inputData.toLowerCase();
            let stringEmployee = employee[key].toString().toLowerCase();

            if (stringEmployee.includes(lowerInputData)) {
                matchingEmployees.set(employee.id, employee);
                break;
            }
        }
    }

    return matchingEmployees;
}

const searchEmployeeData = async (req, res, next) => {
    try {
        const { inputData } = req.body;

        const inputArray = inputData.split(" ");
        let outputMap = new Map();

        for (let i = 0; i < inputArray.length; i++) {
            let matchingEmployees = await searchFunction(inputArray[i]);
            matchingEmployees.forEach((employee, id) => outputMap.set(id, employee));
        }

        const outputArray = Array.from(outputMap.values());

        if(outputArray.length === 0){
            return res
                .status(404)
                .json({msg : "No Employee Found!!"})
        }

        return res
        .status(200)
        .json(outputArray);

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

module.exports = {
    searchEmployeeData
};