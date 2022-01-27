import './ConnectWallet.css';
import MyAlgoConnect from "@randlabs/myalgo-connect";

const walletConnection = localStorage.getItem("wallet-type") === null ? false : true;
const walletAddress = localStorage.getItem("address");

const logOut = () => {
    localStorage.removeItem("address");
    localStorage.removeItem("addresses");
    localStorage.removeItem("wallet-type");
    window.location.reload();
    console.log("logged-out");
  };

const myAlgoConnect = async () =>{
    const myAlgoWallet = new MyAlgoConnect({
        shouldSelectOneAccount: false
    })
    try{
        const accounts = await myAlgoWallet.connect({
            shouldSelectOneAccount: true,
        })
        const addresses = accounts.map((item) => item?.address);
        const address = accounts[0].address;

        localStorage.setItem("wallet-type", "my-algo");
        localStorage.setItem("address", address);
        localStorage.setItem("addresses", addresses);

      window.location.reload();
    }catch(error){
        console.log(error)
    }
}

console.log(walletAddress)
const ConnectWallet = () => {
    return (
        <div className="something">
            {walletConnection ? (
                <>
                    <p>You connected successfully</p>
                    <p>{walletAddress}</p>
                    <button onClick={logOut}>Disconnect Wallet</button>
                </>   
            ):
            (
                <>
                    <button onClick={myAlgoConnect}>Connect Wallet</button>
                </>
            )}
        </div>
      );
}
 
export default ConnectWallet;