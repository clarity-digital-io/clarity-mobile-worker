export const FormSchema = {
	name: 'Form',
	primaryKey: 'Id',
  properties: {
    Id: 'string',
		Name: 'string',
		Title: 'string',
		Description: 'string',
		Status: 'string',
		Multi_Page: {type: 'bool', default: false},
		Multi_Page_Val: {type: 'bool', default: false},
		Multi_Page_Info: {type: 'string', default: ''},
		ChecklistGroup: 'data?',
		Questions: 'Question[]',
		Form_Connections: 'Form_Connection[]'
  },
};

export const FormConnectionSchema = {
	name: 'Form_Connection',
	primaryKey: 'Id', 
	properties: {
		Id: 'string',
		Name: 'string',
		Form: 'string',
		New: 'bool',
		Salesforce_Object: 'string',
		Type: 'string',
		Form_Connection_Fields: 'Form_Connection_Field[]'
	}
}

export const FormConnectionFieldSchema = {
	name: 'Form_Connection_Field',
	primaryKey: 'Id', 
	properties: {
		Id: 'string',
		Name: 'string',
		Form_Connection: 'string',
		Question: 'string',
		Custom_Value: 'data?',
		PreFill: 'bool',
		Salesforce_Field: 'data?',
	}
}

export const ResponseConnectionSchema = {
	name: 'Response_Connection',
	primaryKey: 'Id',
	properties: {
		Id: 'string',
		Name: 'string'
	}
}

export const QuestionSchema = {
	name: 'Question',
	primaryKey: 'Id',
  properties: {
		Id: 'string',
		Name: 'string',
    Form: 'string',
		Title: 'string?',
		Type: 'string',
    Order: {type: 'int', default: 0},
    Lookup: 'data?',
		Max_Length: 'int',
		Max_Range: 'int',
		Min_Range: 'int',
		Page: 'int',
		Required: 'bool',
		Salesforce_Field: 'data?',
		Salesforce_Object: 'data?',
		Logic: {type: 'string', default: ''},
		FreeText_Type: {type: 'string', default: ''},
		Record_Group: 'string?',
		Prefill_Type: 'data?',
		Question_Options: 'Question_Option[]',
		Question_Criteria: 'Question_Criteria[]'
	}
};

export const QuestionOptionSchema = {
	name: 'Question_Option',
	primaryKey: 'Id',
  properties: {
		Id: 'string',
		Name: 'string',
		Question: 'string',
		Label: 'string'
  }
};

export const QuestionCriteriaSchema = {
	name: 'Question_Criteria',
	primaryKey: 'Id',
  properties: {
		Id: 'string',
		Name: 'string',
		Question: 'string',
		Field: 'string', 
		Field_Type: 'string',
		Operator: 'string',
		Type: 'string',
		Value: 'string'
  }
};

export const ResponseSchema = {
	name: 'Response',
	primaryKey: 'UUID',
  properties: {
		UUID: 'string',
		Name: 'string', 
		Status: 'string',
		Submitted_Date: 'data?', 
		Form: 'string',
		OwnerId: 'string',
		Checklist: 'data?',
		Answers: 'Answer[]'
  },
};

export const AnswerSchema = {
	name: 'Answer',
	primaryKey: 'UUID',
	properties: {
		UUID: 'string',
		IsAttachment: {type: 'bool', default: false},
		Name: {type: 'string', default: ''},
		Answer: {type: 'string', default: ''},
		Path: {type: 'string', default: ''},
		Base64: {type: 'string', default: ''},
		FileLocation: {type: 'string', default: ''},
		ContentDocument: {type: 'string', default: ''},
		ContentVersion: {type: 'string', default: ''},
		Date_Answer: {type: 'string', default: ''},
		Record: {type: 'string', default: ''},
		Question: 'string',
		Response: 'string',
	}
}

export const sObjectSchema = {
	name: 'sObject',
	primaryKey: 'Id',
	properties: {
		Id: 'string',
		Name: 'string', 
		Type: 'string',
		LastModifiedDate: 'string',
		CreatedDate: 'string',
		Values: 'string'
	}
}

export const ProfileSchema = {
	name: 'Profile',
	primaryKey: 'Id', //userId
	properties: {
		Id: 'string',
		Email: 'string', 
		FullName: 'string',
		Avatar: 'string',
		LastSync: 'date',
		SyncStatus: 'string' //Complete / Requested / In Progress / Failed / Not Started
	}
}

//checklist groups
export const ChecklistGroupSchema = {
	name: 'ChecklistGroup',
	primaryKey: 'Id', //userId
	properties: {
		Id: 'string',
		Name: 'string', 
		Standard: {type: 'bool', default: false}
	}
}

//checklist 
export const ChecklistSchema = {
	name: 'Checklist',
	primaryKey: 'Id', //userId
	properties: {
		Id: 'string',
		ChecklistGroup: 'string', 
		sObject: 'string',
		RecordId: 'string',
		Status: 'string'
	}
}
