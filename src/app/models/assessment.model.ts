export class Assessment {
    id?: number = 0;
    assessment_type_id: number = 0;
    student_id: number = 0;
    date: Date =new Date(); // השתמש ב- Date כדי לייצג תאריך ושעה
    value: number = 0;
}
