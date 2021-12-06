import axios from 'axios'
class CommunityWalletExpressServerClient {
    constructor(mnemonic, password) {
        this.mnemonic = mnemonic
        this.password = password

        this.axiosClient = axios.create({
            baseURL: 'http://localhost:3000',
            timeout: 1000,
            headers: { 'mnemonic': mnemonic, 'password': password }
        });
    }
}

class Community extends CommunityWalletExpressServerClient {
    constructor(mnemonic, password) {
        super(mnemonic, password)
        this.axiosClient.defaults.baseURL = this.axiosClient.defaults.baseURL + '/community'
    }


    async getOneByCode(code) {
        return new Promise((resolve, reject) => {
            this.axiosClient.post('/getOneByCode', { communityCode: code, something: 'err' })
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    //console.log(err.response.data)
                    reject(err.response.data)
                })
        })
    }


}

const comm = new Community('U2FsdGVkX1+KGrVrOwkAGXdUpgvqcFwY+/XIq8HPlSipiH41i2B8f/IJ2u3ZJulR3ZH4Wb18BzYkAATIGF9vjFmWG5TxnyYAq6bkxJkCMMobOuUfLOA9OeNKq/zZL+y7', 'ilovelfa')

console.log(await comm.getOneByCode('SCCcip'))