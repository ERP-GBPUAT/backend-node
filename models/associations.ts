import User from "./user"
import Student from "./student"
import Faculty from "./faculty"
import StudentLeave from "./studentLeave"
import FacultyLeave from "./facultyLeave"
import Research from "./facultyResearch"

User.hasOne(Student)
Student.belongsTo(User)

User.hasOne(Faculty)
Student.belongsTo(User)

Student.hasMany(StudentLeave)
StudentLeave.belongsTo(Student)

Faculty.hasMany(Research)
Research.belongsTo(Faculty)

Faculty.hasMany(Student)
Student.belongsTo(Faculty)

Faculty.hasMany(FacultyLeave)
FacultyLeave.belongsTo(Faculty)

User.sync()
Faculty.sync()
Student.sync()
StudentLeave.sync()
FacultyLeave.sync()
Research.sync()
