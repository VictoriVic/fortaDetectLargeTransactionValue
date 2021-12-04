import BigNumber from "bignumber.js";

import { 
  TransactionEvent, 
  Finding, 
  HandleTransaction, 
  FindingSeverity, 
  FindingType,
  createTransactionEvent,
  getJsonRpcUrl

} from 'forta-agent'

import CreateFinding from "./finding_creator"

const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];
  const finding = CreateFinding(txEvent.transaction.value, txEvent.hash)  
  if (finding){
    findings.push(finding)
  }
  return findings;
}

export default {
  handleTransaction
}