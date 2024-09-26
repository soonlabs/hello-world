"use client";

import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";

export default function Hero() {
  const { publicKey, sendTransaction } = useWallet();
  const programId = new PublicKey(
    "7qhC7bD9cDV9LTwjgVmGJHs5rGtrMY4pSBw1KswuaBfk" // change this to your program ID
  );
  const connection = new Connection("https://rpc.devnet.soo.network/rpc");

  //   class GreetingAccount {
  //     counter = 0;
  //     constructor(fields: { counter: number } | undefined = undefined) {
  //       if (fields) {
  //         this.counter = fields.counter;
  //       }
  //     }
  //   }

  //   const GreetingSchema = new Map([
  //     [GreetingAccount, { kind: "struct", fields: [["counter", "u32"]] }],
  //   ]);

  //   const GREETING_SIZE = borsh.serialize(
  //     GreetingSchema,
  //     new GreetingAccount()
  //   ).length;

  const GREETING_SIZE = 4; // (4 bytes for u32)

  async function sayHello(): Promise<void> {
    try {
      if (!publicKey) {
        toast.error("Please connect your wallet!");
        return;
      }

      console.log(`Using program ${programId.toBase58()}`);

      // Derive the address (public key) of the greeting account
      const GREETING_SEED = "hello";
      const greetedPubkey = await PublicKey.createWithSeed(
        publicKey,
        GREETING_SEED,
        programId
      );

      // Check if the greeting account has already been created
      const greetedAccount = await connection.getAccountInfo(greetedPubkey);

      if (greetedAccount === null) {
        console.log(
          "Creating account",
          greetedPubkey.toBase58(),
          "to say hello to"
        );

        const lamports = await connection.getMinimumBalanceForRentExemption(
          GREETING_SIZE
        );

        const transaction = new Transaction().add(
          SystemProgram.createAccountWithSeed({
            fromPubkey: publicKey,
            basePubkey: publicKey,
            seed: GREETING_SEED,
            newAccountPubkey: greetedPubkey,
            lamports,
            space: GREETING_SIZE,
            programId,
          })
        );

        const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction(signature, "processed");

        toast.success("Account created successfully!");
      } else {
        console.log(
          "Greeting account already exists:",
          greetedPubkey.toBase58()
        );
      }

      // Proceed with saying hello (sending the transaction)
      const instruction = new TransactionInstruction({
        keys: [{ pubkey: greetedPubkey, isSigner: false, isWritable: true }],
        programId,
        data: Buffer.alloc(0), // All instructions are hellos
      });

      const signature = await sendTransaction(
        new Transaction().add(instruction),
        connection
      );
      await connection.confirmTransaction(signature, "processed");

      toast.success("Hello sent successfully!");
    } catch (error) {
      console.error("Error in sayHello:", error);
      toast.error("Error occurred while processing.");
    }
  }

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <div className="text-center text-black mb-4">
        Check the console for actions.
      </div>
      <div className="text-center text-black mb-4">
        Make sure you are connected to the wallet.
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={sayHello}
          >
            Say Hello
          </button>
        </div>
      </div>
    </div>
  );
}
