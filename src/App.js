import { ethers } from 'ethers';
import { useState } from 'react';
import { Wrapper, Search, Button, Input, Table, Row} from './Components/Styles';

function App() {
  return (
    <div>
        <Search>
          <NFTForm />
        </Search>
    </div>
  );
}

const NFTForm = (props) => {

  console.log('application started...')

  // our application state (comes ultimately from the blockchain)
  const [contractAddress, setContractAddress] = useState('');
  const [ownerAddress, setOwnerAddress] = useState('');
  const [ownerNFTs, setOwnerNFTSs] = useState(0);
  const [contractBalance, setContractBalance] = useState(0);

  // our contract ABI
  const contractABI = [
    "function getContractOwner() view returns (address)",
    "function getNFTCount() view returns (uint)",
    "function getNFTOwner(uint id) view returns (address owner)",
    "function getNFTDetails(uint if) view returns(string name, string url)"
  ]

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const nftContract = new ethers.Contract(contractAddress, contractABI, provider);

  // functions to handle lookups and interact with the blockchain and our contract
  const handleSubmit = (e) => {
    console.log(`submitting for contract: ${contractAddress}`)
    e.preventDefault();
    
    if (contractAddress == null) {
      return
    }

    // just grab the balance in the contract
    provider.getBalance(contractAddress).then(function(results) {
      let balance = ethers.utils.formatEther(results);
      setContractBalance(balance);
    })

    nftContract.getContractOwner().then(function(results) {
      setOwnerAddress(results);
    })

    nftContract.getNFTCount().then(function(results) {
      let count = ethers.utils.formatEther(results);
      setOwnerNFTSs(count * 1000000000000000000);
    })

    // some console logs
    nftContract.getNFTOwner(0).then(function(results) {
      console.log(`NFT owner is ${results}`);
    })

    nftContract.getNFTDetails(0).then(function(results) {
      console.log(`NFT details are: ${results}`);
    })
  }
  
  // our view
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <label>
          <Input 
            type='text' 
            placeholder='enter an address...' 
            value={contractAddress}
            onChange={e => setContractAddress(e.target.value)} 
        />
        </label>
        <Button type='submit' value='search' />
      </form>
        <table>
          <thead>
            <tr>
              <th>OWNER</th>
              <th>NUMBER OF NFTs</th>
              <th>TOTAL SALES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Row>{ownerAddress}</Row>
              <Row>{ownerNFTs}</Row>
              <Row>{contractBalance}</Row>
            </tr>
          </tbody>
        </table>
    </Wrapper>
  )
}

export default App;