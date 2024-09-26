# Hello Word on SOON

This is a simple example of how to use the SOON Network to deploy a simple "Hello World" application.

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [Rust](https://www.rust-lang.org/)
- [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)

#### Additionaly you can use our Bridge to get the Devnet SOL

```bash
https://bridge.devnet.soo.network/home
```

#### Also if you dont't have Sepolia ETH you can use the faucet

```bash
https://faucet.soo.network/
```

## Installation

1. Clone the repository

```bash
git clone https://github.com/soonlabs/hello-world
cd hello-world
```

2. Install the dependencies and build the project

```bash
cd src/program-rust
cargo build-sbf
```

3. set-up the RPC URL for SOON Network

```bash
solana config set --url https://rpc.devnet.soo.network/rpc
```

5. Deploy the program to the SOON Network

```bash
solana program deploy ./target/deploy/hello_world.so
```

6. Once you have a deployed program, you can start interacting with it using the frontend, just cd to root directory and run the following commands:

```bash
cd frontend
pnpm i
pnpm start
```

### Note: You need to change the programId in the frontend/src/components/hero.tsx file to the programId of the deployed program.

## Acknowledgments

This project is based on the [Solana Hello World example](https://github.com/solana-labs/example-helloworld/), and we would like to credit the Solana Labs team for providing the foundation for this implementation.
