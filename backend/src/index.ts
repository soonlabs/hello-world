import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";
import base58 from "bs58";

const programId = new PublicKey("7qhC7bD9cDV9LTwjgVmGJHs5rGtrMY4pSBw1KswuaBfk");

async function sayHello(): Promise<void> {
  const connection = new Connection(
    "https://rpc.devnet.soo.network/rpc",
    "confirmed"
  );
  let keyPair = Keypair.fromSecretKey(
    base58.decode(
      "2X4wTXdBeEMLUhytyZXvdd9TjAMYaprpNr9vWVf28riT27vspyuRGfRbBXtgpPdLXAZztbC7PeVWfFpxcUfmBTXF" // Add your secret key here
    )
  );
  const pubKey = keyPair.publicKey;
  try {
    console.log(`Using program ${programId.toBase58()}`);

    // Derive the address (public key) of the greeting account
    const GREETING_SEED = "hello";
    const greetedPubkey = await PublicKey.createWithSeed(
      pubKey,
      GREETING_SEED,
      programId
    );

    const greetedAccount = await connection.getAccountInfo(greetedPubkey);

    if (greetedAccount === null) {
      console.log(
        "Creating account",
        greetedPubkey.toBase58(),
        "to say hello to"
      );

      const GREETING_SIZE = 4; // (4 bytes for u32)

      const lamports = await connection.getMinimumBalanceForRentExemption(
        GREETING_SIZE
      );

      const transaction = new Transaction().add(
        SystemProgram.createAccountWithSeed({
          fromPubkey: pubKey,
          basePubkey: pubKey,
          seed: GREETING_SEED,
          newAccountPubkey: greetedPubkey,
          lamports,
          space: GREETING_SIZE,
          programId,
        })
      );

      const signature = await connection.sendTransaction(
        transaction,
        [keyPair],
        { skipPreflight: false }
      );
      console.log("Transaction confirmed", signature);
    } else {
      console.log("Greeting account already exists:", greetedPubkey.toBase58());
      // Proceed with saying hello (sending the transaction)
      const instruction = new TransactionInstruction({
        keys: [{ pubkey: greetedPubkey, isSigner: false, isWritable: true }],
        programId,
        data: Buffer.alloc(0), // All instructions are hellos
      });

      const signature = await connection.sendTransaction(
        new Transaction().add(instruction),
        [keyPair],
        { skipPreflight: false }
      );
      await connection.confirmTransaction(signature, "processed");
      console.log("Transaction confirmed", signature);
    }
  } catch (error) {
    console.error("Error in sayHello:", error);
  }
}

sayHello();
