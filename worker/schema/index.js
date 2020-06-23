export const FormSchema = {
	name: 'Form__c',
	primaryKey: 'Id',
  properties: {
    Id: 'string',
		Name: 'string',
		Title__c: 'string',
		Description__c: 'string',
		Status__c: 'string',
		Multi_Page__c: {type: 'bool', default: false},
		Multi_Page_Val__c: {type: 'bool', default: false},
		Multi_Page_Info__c: {type: 'string', default: ''},
		Questions__r: 'Question__c[]'
  },
};

export const FormConnectionSchema = {
	name: 'Form_Connection__c',
	primaryKey: 'Id', 
	properties: {
		Id: 'string',
		Name: 'string',
		New__c: 'bool',
		Result_Holder__c: 'string',
		Salesforce_Object__c: 'string',
		Type__c: 'string',
		Form_Connection_Fields__r: 'Form_Connection_Field__c[]'
	}
}

export const FormConnectionFieldSchema = {
	name: 'Form_Connection_Field__c',
	primaryKey: 'Id', 
	properties: {
		Id: 'string',
		Name: 'string',
		Form_Connection__c: 'string',
		Question__c: 'string',
		Custom_Value__c: 'string',
		PreFill__c: 'string',
		Salesforce_Field__c: 'string'
	}
}

export const ResponseConnectionSchema = {
	name: 'Response_Connection__c',
	primaryKey: 'Id',
	properties: {
		Id: 'string',
		Name: 'string'
	}
}

export const QuestionSchema = {
	name: 'Question__c',
	primaryKey: 'Id',
  properties: {
		Id: 'string',
		Name: 'string',
    Form__c: 'string',
		Title__c: 'string',
		Type__c: 'string',
    Order__c: {type: 'int', default: 0},
    Lookup__c: 'data?',
		Max_Length__c: 'int',
		Max_Range__c: 'int',
		Min_Range__c: 'int',
		Page__c: 'int',
		Required__c: 'bool',
		Salesforce_Field__c: 'data?',
		Salesforce_Object__c: 'data?',
		Logic__c: {type: 'string', default: ''},
		FreeText_Type__c: {type: 'string', default: ''},
		Record_Group__c: 'data?',
		Prefill_Type__c: 'data?',
		Question_Options__r: 'Question_Option__c[]',
		Question_Criteria__r: 'Question_Criteria__c[]'
	}
};

export const QuestionOptionSchema = {
	name: 'Question_Option__c',
	primaryKey: 'Id',
  properties: {
		Id: 'string',
		Name: 'string',
		Question__c: 'string',
		Label__c: 'string'
  }
};

export const QuestionCriteriaSchema = {
	name: 'Question_Criteria__c',
	primaryKey: 'Id',
  properties: {
		Id: 'string',
		Name: 'string',
		Question__c: 'string',
		Field__c: 'string', 
		Field_Type__c: 'string',
		Operator__c: 'string',
		Type__c: 'string',
		Value__c: 'string'
  }
};

export const ResponseSchema = {
	name: 'Response__c',
	primaryKey: 'Id',
  properties: {
		Id: 'string',
		Name: 'string', 
		Completion__c: 'bool',
		Status__c: 'string',
		Submitted_Date__c: 'data?', 
		UUID__c: 'string',
		Form__c: 'string'
  },
};

export const AnswerSchema = {
	name: 'Answer__c',
	primaryKey: 'Id',
	properties: {
		Id: 'string',
		Name: 'string', 
		Answer__c: 'string',
		Response__c: 'string',
		ContentDocument__c: 'string',
		ContentVersion__c: 'string',
		Date_Answer__c: 'string',
		Record__c: 'string'
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
		access_token: 'string',
		full_name: 'string',
		avatar: 'string',
		last_sync: 'date',
		sync_status: 'string' //Sync Complete / Requested / In Progress / Sync Failed / Not Started / Request Failed
	}
}