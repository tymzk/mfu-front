export class Assignment {
  id: number;
  name: string;
	items: AssignmentItems[];
}

export class AssignmentItems {
	name: string;
	description: string;
}