export class Subject {
  _id: string;
  name: string;
  teachers: Person[];
  assignments: Assignment[];
  students: string[];
}

export class Person {
  _id: string;
  id: string;
  subjects: Subject[];
}

export class Assignment {
  _id: number;
  name: string;
  deadline: Date;
	items: AssignmentItem[];
}

export class AssignmentItem {
  _id: number;
	name: string;
	description: string;
}
