import { useState } from "react";

function App() {
  const [walletKey, setWalletKey] = useState(undefined);

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      try {
        const response = await solana.connect();
        console.log("wallet account ", response.publicKey.toString());
        setWalletKey(response.publicKey.toString());
      } catch (err) {
        console.error(err)
      }
    }
  };

  const disconnectWallet = async () => {
    const { solana } = window;
    if (walletKey && solana) {
      await (solana).disconnect();
      setWalletKey(undefined);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {!walletKey && (
          <button onClick={connectWallet}>
            Connect to Phantom Wallet
          </button>
        )}

        {walletKey && (
          <div>
            <p>{walletKey}</p>

            <button onClick={disconnectWallet}>
              Disconnect
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;