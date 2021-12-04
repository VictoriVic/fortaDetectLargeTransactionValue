import { Finding, FindingType, FindingSeverity } from "forta-agent"
import BigNumber from "bignumber.js"

export default function(value:string, hash:string):Finding|undefined{
    const decodedValue = new BigNumber(value)
    if (decodedValue.isGreaterThan("10000000000000000000000")){
        return  Finding.fromObject({
            name: "Extremaly Large value",
            description: "Value is largest than 10000000000000000000000",
            alertId: "TX-VALUE-1",
            severity: FindingSeverity.High,
            type: FindingType.Suspicious,
            metadata:{
              value:value,
              hash: hash
            }
    
          })
    }

    if (decodedValue.isGreaterThan("1000000000000000000")){
        return  Finding.fromObject({
            name: "Large value",
            description: "Value is largest than 1000000000000000000",
            alertId: "TX-VALUE-2",
            severity: FindingSeverity.Info,
            type: FindingType.Suspicious,
            metadata:{
              value:value,
              hash: hash
            }
    
          })
    }
    
}