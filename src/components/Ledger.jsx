import React, { useEffect, useState } from 'react'
import { LedgerCanister, AccountIdentifier } from '@dfinity/ledger-icp'
import { createAgent } from '@dfinity/utils'
import { useAuth } from '../../use-auth-client'
import { Principal } from '@dfinity/principal'
const { identity, logout, principal } = useAuth()
const [ICPLedger, setICPLedger] = useState(null)
const [hexID, setHexID] = useState(null)
const [bal, setBal] = useState(null)

const MY_LEDGER_CANISTER_ID = 'ryjl3-tyaaa-aaaaa-aaaba-cai'
const HOST = `http://localhost:4943?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}#authorize`
useEffect(() => {
    setUpLedger()
  }, [])
  async function setUpLedger() {
    const agent = await createAgent({
      identity,
      host: HOST,
    })
    //{ transactionFee, transfer, icrc1Transfer,accountBalance }
    let ledger = LedgerCanister.create({
      agent,
      canisterId: MY_LEDGER_CANISTER_ID,
    })
    setICPLedger(ledger)
    console.log('Icp ledger setup successfully')
  }
  async function getBalance() {
    const accIdentifier = AccountIdentifier.fromHex(
      //replace this with the account id that you copied from the previous step
      'c534cb97073c30f897c8dfdd50c86406b297ae9028299f4592ac4a0cb6692f06',
    )
    const res = await ICPLedger.accountBalance({
      accountIdentifier: accIdentifier,
      certified: false,
    })
    setBal(Number(res))
    console.log('Icp balance :', res)
  }
  
  async function princToAcc() {
    const acc = AccountIdentifier.fromPrincipal({
      principal: principal,
      subAccount: undefined,
    }).toHex()
    setHex(acc)
    console.log(acc)
  }
  <div>
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}
  >
    <h2>ICP Ledger Walkthrough</h2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '10px',
        alignItems: 'center',
      }}
    >
      <button
        style={{ backgroundColor: 'brown', color: 'white', width: '400px' }}
        onClick={() => logout()}
      >
        Logout
      </button>
      <br/>

      <button
        style={{ backgroundColor: 'brown', color: 'white', width: '400px' }}
        onClick={() => getBalance()}
      >
        Get Balance
      </button>
      <span>Balance : {bal}</span>
      <button
        style={{ backgroundColor: 'brown', color: 'white', width: '400px' }}
        onClick={() => princToAcc()}
      >
        princToAcc
      </button>
      <span>Hex Account : {hexID}</span>
    </div>
  </div>
</div>
import React, { useEffect, useState } from 'react'
import { LedgerCanister, AccountIdentifier } from '@dfinity/ledger-icp'
import { createAgent } from '@dfinity/utils'
import { useAuth } from '../use-auth-client'
import { Principal } from '@dfinity/principal'
const Ledger = () => {
  const { identity, logout, principal } = useAuth()
  const [ICPLedger, setICPLedger] = useState(null)
  const [hexID, setHexID] = useState(null)
  const [bal, setBal] = useState(null)
  const MY_LEDGER_CANISTER_ID = 'ryjl3-tyaaa-aaaaa-aaaba-cai'
  const HOST = `http://localhost:4943?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}#authorize`

  useEffect(() => {
    setUpLedger()
  }, [])
  async function setUpLedger() {
    const agent = await createAgent({
      identity,
      host: HOST,
    })
    let ledger = LedgerCanister.create({
      agent,
      canisterId: MY_LEDGER_CANISTER_ID,
    })
    setICPLedger(ledger)
    console.log('Icp ledger setup successfully')
  }

  async function getBalance() {
    const accIdentifier = AccountIdentifier.fromHex(
      'ebc5f90afc543a620a4b05a1621284a4863ff02649206a4be3718b3cd0511571',
    )
    const res = await ICPLedger.accountBalance({
      accountIdentifier: accIdentifier,
      certified: false,
    })
    setBal(Number(res))
    console.log('Icp balance :', res)
  }

  async function princToAcc() {
    const acc = AccountIdentifier.fromPrincipal({
      principal: principal,
      subAccount: undefined,
    }).toHex()
    setHexID(acc)
    console.log(acc)
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <h2>ICP Ledger Tutorial</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px',
            alignItems: 'center',
          }}
        >
          <button
            style={{ backgroundColor: 'brown', color: 'white', width: '400px' }}
            onClick={() => logout()}
          >
            Logout
          </button>
          <br />

          <button
            style={{ backgroundColor: 'brown', color: 'white', width: '400px' }}
            onClick={() => getBalance()}
          >
            Get Balance
          </button>
          <span>Balance : {bal}</span>
          <button
            style={{ backgroundColor: 'brown', color: 'white', width: '400px' }}
            onClick={() => princToAcc()}
          >
            princToAcc
          </button>
          <span>Hex Account : {hexID}</span>
        </div>
      </div>
    </div>
  )
}
export default Ledger
import React from 'react'
import { useAuth } from '../use-auth-client'
import Ledger from './Ledger'

const one = () => {
  const { isAuthenticated, login, principal, logout } = useAuth()
  return (
    <>
      {isAuthenticated ? (
        <Ledger />
      ) : (
        <button
          style={{ backgroundColor: 'brown', color: 'white' }}
          onClick={login}
        >
          Log in
        </button>
      )}
    </>
  )
}
export default one
import { createActor } from './createActor'
const [indexCanister, setIndexCanister] = useState(null)
const ICPIndexID = 'qhbym-qaaaa-aaaaa-aaafq-cai'
const actor = createActor(ICPIndexID, {
    agentOptions: {
      identity,
    },
  })
  
  setIndexCanister(actor)
  console.log('index canister set up successfully')
  
