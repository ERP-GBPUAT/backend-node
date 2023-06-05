import User from "./user";
import Student from "./student";
import Faculty from "./faculty";
import StudentLeave from "./studentLeave";
import FacultyLeave from "./facultyLeave";
import Research from "./facultyResearch";
import Inventory from "./inventory";
import { Semester,Course } from "./semester";
import Subject from "./subject";
import NoDues from "./nodues";
import Staff from "./staff";
import Notice from "./notices";
import EmpNoDues from "./empNoDues";

User.hasOne(Student);
Student.belongsTo(User);

User.hasOne(Staff)
Staff.belongsTo(User)

User.hasOne(Faculty);
Faculty.belongsTo(User);

Student.hasMany(StudentLeave);
StudentLeave.belongsTo(Student);

Faculty.hasMany(Research);
Research.belongsTo(Faculty);

Faculty.hasMany(Student);
Student.belongsTo(Faculty);

Faculty.hasMany(FacultyLeave);
FacultyLeave.belongsTo(Faculty);

Student.hasMany(Semester);
Semester.belongsTo(Student);

Semester.hasMany(Course);
Course.belongsTo(Semester);

Subject.belongsTo(Course)
Course.hasOne(Subject);

Student.hasOne(NoDues);
NoDues.belongsTo(Student);

Faculty.hasOne(EmpNoDues);
EmpNoDues.belongsTo(Faculty);

User.sync()
Faculty.sync()
Student.sync()
StudentLeave.sync()
FacultyLeave.sync()
Research.sync()
Inventory.sync();
Semester.sync();
Course.sync();
Subject.sync();
NoDues.sync()
Staff.sync()
Notice.sync()
EmpNoDues.sync()
