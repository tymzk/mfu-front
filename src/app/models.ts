interface Serializable<T> {
  deserialize(input: Object): T;
}

export class Subject implements Serializable<Subject> {
  _id: string;
  name: string;
	semester: string;
  teachers: string[];
	assistants: string[];
  assignments: Assignment[];
  students: string[];
	created: Date;
/*
  serialize(input){
    this._id         = input._id;
    this.name        = input.name;
    this.semester    = input.semester;
    this.teachers    = input.teachers;
    this.assistants  = input.assistants;
    this.students    = input.students;
    this.created     = new Date(input.created.getTime() + (input.created.getTimezoneOffset()*60*1000));
    this.assignments = [];

    return JSON.stringify(this);
  }
*/
  deserialize(input): Subject{
    this._id         = input._id;
    this.name        = input.name;
    this.semester    = input.semester;
    this.teachers    = input.teachers;
    this.assistants  = input.assistants;
    this.students    = input.students;
    this.created     = new Date(input.created);
    this.assignments = [];

    for(var i = 0; i < input.assignments.length; i++){
      this.assignments.push(new Assignment().deserialize(input.assignments[i]));
    }
    return this;
  }

}

export class Assignment implements Serializable<Assignment> {
  _id: string;
  name: string;
	private: Boolean;
  deadline: Date;
	description: string;
	items: AssignmentItem[];
	created: Date;
/*
  serialize(input: any){
    this._id         = input._id;
    this.name        = input.name;

    this.private     = input.private;
    this.description = input.description;
    this.deadline    = new Date(input.deadline.getTime() + (input.deadline.getTimezoneOffset()*60*1000));
    this.created     = new Date(input.created.getTime() + (input.created.getTimezoneOffset()*60*1000));
    this.items       = [];

    for(var i = 0; i < input.items.length; i++){
      this.items.push(new AssignmentItem().serialize(input.items[i]));
    }

    return this;
  }*/

  deserialize(input: any): Assignment{
    this._id         = input._id;
    this.name        = input.name;

    this.private     = input.private;
    this.description = input.description;
    this.deadline    = new Date(input.deadline);
    this.created     = new Date(input.created);
    this.items       = [];

    for(var i = 0; i < input.items.length; i++){
      this.items.push(new AssignmentItem().deserialize(input.items[i]));
    }

    return this;
  }
}

export class AssignmentItem implements Serializable<AssignmentItem> {
  _id: string;
	name: string;
	extensions: string[];
  alias: string;
	description: string;
/*
  serialize(input: any){
    this._id         = input._id;
    this.name        = input.name;
    this.extensions  = input.extensions;
    this.alias       = input.alias;
    this.description = input.description;

    return this;
  }
*/
  deserialize(input){
    this._id         = input._id;
    this.name        = input.name;
    this.extensions  = input.extensions;
    this.alias       = input.alias;
    this.description = input.description;

    return this;
  }
}

export class Person {
  _id: string;
  id: string;
  subjects: Subject[];

  deserialize(input){
    this._id = input._id;
    this.id  = input.id;

    for(var subject in input.subjects){
      this.subjects.push(new Subject().deserialize(subject));
    }

    return this;
  }

}
