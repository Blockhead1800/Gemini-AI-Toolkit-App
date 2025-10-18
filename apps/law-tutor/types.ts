
export interface CaseFile {
  clientName: string;
  opposingParty: string;
  jurisdiction: string;
  caseType: string;
  dateOfIncident: string;
}

export interface CaseDetails {
  caseFile: CaseFile;
  clientStatement: string;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}
