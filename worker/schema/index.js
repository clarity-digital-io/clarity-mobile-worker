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
		Questions: 'Question[]'
  },
};

export const FormConnectionSchema = {
	name: 'Form_Connection',
	primaryKey: 'Id', 
	properties: {
		Id: 'string',
		Name: 'string',
		New: 'bool',
		Result_Holder: 'string',
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
		Custom_Value: 'string',
		PreFill: 'string',
		Salesforce_Field: 'string'
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
		Title: 'string',
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
		Record_Group: 'data?',
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
		Name: 'data?', 
		Status: 'string',
		Submitted_Date: 'data?', 
		Form: 'string',
		OwnerId: 'string',
		Answers: 'Answer[]'
  },
};

export const AnswerSchema = {
	name: 'Answer',
	primaryKey: 'UUID',
	properties: {
		UUID: 'string',
		Name: 'data?', 
		Answer: {type: 'string', default: ''},
		Response: 'string',
		ContentDocument: {type: 'string', default: ''},
		ContentVersion: {type: 'string', default: ''},
		Date_Answer: {type: 'string', default: ''},
		Record: {type: 'string', default: ''},
		Question: 'string'
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
		id: 'string',
		email: 'string', 
		full_name: 'string',
		avatar: 'string',
		last_sync: 'date',
		sync_status: 'string' //Complete / Requested / In Progress / Failed / Not Started
	}
}