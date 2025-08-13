import { UUID } from 'crypto';

// Base class for all data models demonstrating encapsulation
export abstract class BaseModel {
  protected _id?: UUID;
  protected _createdAt?: string;

  constructor(id?: UUID, createdAt?: string) {
    this._id = id;
    this._createdAt = createdAt || new Date().toISOString();
  }

  // Encapsulation: Protected properties with public getters
  get id(): UUID | undefined {
    return this._id;
  }

  get createdAt(): string {
    return this._createdAt!;
  }

  // Abstract method for validation
  abstract validate(): boolean;

  // Common method for all models
  toJSON(): Record<string, any> {
    return {
      id: this._id,
      createdAt: this._createdAt,
    };
  }
}

// Encapsulated Log class
export class LogModel extends BaseModel {
  private _userId?: UUID;
  private _studentId: UUID;
  private _behaviorCategoryId: UUID;
  private _mood?: string;
  private _notes?: string;

  constructor(
    studentId: UUID,
    behaviorCategoryId: UUID,
    userId?: UUID,
    mood?: string,
    notes?: string,
    id?: UUID,
    createdAt?: string
  ) {
    super(id, createdAt);
    this._userId = userId;
    this._studentId = studentId;
    this._behaviorCategoryId = behaviorCategoryId;
    this._mood = mood;
    this._notes = notes;
  }

  // Encapsulation: Private properties with public getters/setters
  get userId(): UUID | undefined {
    return this._userId;
  }

  set userId(value: UUID | undefined) {
    this._userId = value;
  }

  get studentId(): UUID {
    return this._studentId;
  }

  set studentId(value: UUID) {
    this._studentId = value;
  }

  get behaviorCategoryId(): UUID {
    return this._behaviorCategoryId;
  }

  set behaviorCategoryId(value: UUID) {
    this._behaviorCategoryId = value;
  }

  get mood(): string | undefined {
    return this._mood;
  }

  set mood(value: string | undefined) {
    this._mood = value;
  }

  get notes(): string | undefined {
    return this._notes;
  }

  set notes(value: string | undefined) {
    this._notes = value;
  }

  // Polymorphism: Implementing abstract validation method
  validate(): boolean {
    return !!this._studentId && !!this._behaviorCategoryId;
  }

  // Override toJSON method
  toJSON(): Record<string, any> {
    return {
      ...super.toJSON(),
      user_id: this._userId,
      student_id: this._studentId,
      behavior_category_id: this._behaviorCategoryId,
      mood: this._mood,
      notes: this._notes,
    };
  }
}

// Encapsulated StudentLog class
export class StudentLogModel extends BaseModel {
  private _firstName: string;
  private _lastName: string;
  private _behavior: string;
  private _mood: string;
  private _notes?: string | null;

  constructor(
    firstName: string,
    lastName: string,
    behavior: string,
    mood: string,
    notes?: string | null,
    createdAt?: string
  ) {
    super(undefined, createdAt);
    this._firstName = firstName;
    this._lastName = lastName;
    this._behavior = behavior;
    this._mood = mood;
    this._notes = notes;
  }

  // Encapsulation: Private properties with public getters/setters
  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }

  get behavior(): string {
    return this._behavior;
  }

  set behavior(value: string) {
    this._behavior = value;
  }

  get mood(): string {
    return this._mood;
  }

  set mood(value: string) {
    this._mood = value;
  }

  get notes(): string | null | undefined {
    return this._notes;
  }

  set notes(value: string | null | undefined) {
    this._notes = value;
  }

  // Polymorphism: Implementing abstract validation method
  validate(): boolean {
    return (
      !!this._firstName && !!this._lastName && !!this._behavior && !!this._mood
    );
  }

  // Override toJSON method
  toJSON(): Record<string, any> {
    return {
      ...super.toJSON(),
      first_name: this._firstName,
      last_name: this._lastName,
      behavior: this._behavior,
      mood: this._mood,
      notes: this._notes,
    };
  }
}

// Encapsulated Mood class
export class MoodModel extends BaseModel {
  private _emoji: string;
  private _name: string;

  constructor(emoji: string, name: string, id?: UUID) {
    super(id);
    this._emoji = emoji;
    this._name = name;
  }

  // Encapsulation: Private properties with public getters/setters
  get emoji(): string {
    return this._emoji;
  }

  set emoji(value: string) {
    this._emoji = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  // Polymorphism: Implementing abstract validation method
  validate(): boolean {
    return !!this._emoji && !!this._name;
  }

  // Override toJSON method
  toJSON(): Record<string, any> {
    return {
      ...super.toJSON(),
      emoji: this._emoji,
      name: this._name,
    };
  }

  // Custom method for display
  getDisplayText(): string {
    return `${this._emoji} ${this._name}`;
  }
}
