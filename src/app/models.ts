interface Serializable<T> {
  deserialize(input: Object): T;
}


export class SubmittedInfo implements Serializable<SubmittedInfo> {
  _id: string;
  mtime: Date;
  size: number;

  deserialize(input: any): SubmittedInfo{
    this._id         = input._id;
    this.mtime       = new Date(input.mtime);
    console.log(this.mtime);
    this.size        = input.size;

    return this;
  }
}

export class Subject implements Serializable<Subject> {
  _id: string;
  name: string;
  public: boolean;
	semester: string;
  teachers: string[];
	assistants: string[];
  assignments: Assignment[];
  students: string[];

  deserialize(input): Subject{
    this._id         = input._id;
    this.name        = input.name;
    this.public      = input.public;
    this.semester    = input.semester;
    this.teachers    = input.teachers;
    this.assistants  = input.assistants;
    this.students    = input.students;
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
	public: boolean;
  deadline: Date;
	description: string;
	items: AssignmentItem[];

  serialize(): string{
    var val = new Date(this.deadline);
    var offset = val.getTimezoneOffset() * 60000;
    var utc = val.getTime() + offset;
    return JSON.stringify({
      _id: this._id,
      public: this.public,
      deadline: new Date(utc),
      description: this.description,
      items: this.items
    });
  }

  deserialize(input: any): Assignment{
    this._id         = input._id;
    this.name        = input.name;

    this.public     = input.public;
    this.description = input.description;
    this.deadline    = new Date(input.deadline);
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
