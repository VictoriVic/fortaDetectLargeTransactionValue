import {
    createTransactionEvent,
    HandleBlock,
    HandleTransaction
  } from "forta-agent"
  import agent from "./agent"
  
  describe("tx value agent", () => {
    let handleTransaction: HandleTransaction
  
    const createTx = (value:string) => createTransactionEvent({
      transaction:{
        hash:"0",
        to:"0",
        from:"0",
        nonce:1,
        gas:"",
        gasPrice:"",
        value:value,
        data:"",
        r:"",
        s:"",
        v:""

        
      },
      type:undefined,
      network:undefined,
      receipt: {}as any,
      block:{}as any


    })
  
    beforeAll(() => {
      handleTransaction = agent.handleTransaction
    })
  
    describe("process event", () => {
      it("normal value", async () => {
        const txEvent = createTx("1000")
  
        const findings = await handleTransaction(txEvent)
  
        expect(findings.length).toBe(0)
      })

      it("hight value", async () => {
        const txEvent = createTx("1000000000000000000000")
  
        const findings = await handleTransaction(txEvent)
  
        expect(findings.length).toBe(1)
        expect(findings[0].alertId).toBe("TX-VALUE-2")
      })

      it("extremaly hight value", async () => {
        const txEvent = createTx("1000000000000000000000000")
  
        const findings = await handleTransaction(txEvent)
  
        expect(findings.length).toBe(1)
        expect(findings[0].alertId).toBe("TX-VALUE-1")
      })
  
    })
  })