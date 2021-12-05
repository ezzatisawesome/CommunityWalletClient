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

    getOneByCode(code) {
        this.axiosClient.post('/getOneByCode')
            .then(res => {
                console.log(res)
            })
    }
}

const comm = new Community('U2FsdGVkX1+KGrVrOwkAGXdUpgvqcFwY+/XIq8HPlSipiH41i2B8f/IJ2u3ZJulR3ZH4Wb18BzYkAATIGF9vjFmWG5TxnyYAq6bkxJkCMMobOuUfLOA9OeNKq/zZL+y7', 'ilovelfa')
console.log(comm.getOneByCode('SCCcip'))