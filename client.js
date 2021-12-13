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
        this.community = Community(this.mnemonic, this.password)
        this.services = Services(this.mnemonic, this.password)
    }
}

class Community extends CommunityWalletExpressServerClient {
    constructor(mnemonic, password) {
        super(mnemonic, password)
        this.axiosClient.defaults.baseURL = this.axiosClient.defaults.baseURL + '/community'
    }

    /* ---------- GET ---------- */
    async getOneByCode(code) {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/getOneByCode', { communityCode: code })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    async getOneById(id) {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/getOneById', { communityId: id })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    async getOneByName(name) {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/getOneByCode', { communityName: name })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    async listAdministrators(code) {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/listAdministrators', { communityCode: code })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    async listAllCommunities() {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/listAllCommunities')
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    async listAllCommunityRequests() {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/listAllCommunityRequests')
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    async listCommunityRequestsApproved(approved) {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/listCommunityRequestsApproved', { isApproved: approved })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    async listCommunityRequestsCompleted(completed) {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/listCommunityRequestsCompleted', { isCompleted: completed })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    async listMembers(name, balances = false) {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/listMembers', { communityName: name, userBalances: balances })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    async searchCommunities(text = '', page = 1, limit = 10) {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/searchCommunities', { searchText: text, page: page, limit: limit })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    async searchCommunityRequests(approved = true, rejected = true, completed = true, uncompleted = true, page = true, limit = true) {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/searchCommunityRequests', {
                isApproved: approved,
                isRejected: rejected,
                isCompleted: completed,
                isUncompleted: uncompleted,
                page: page,
                limit: limit
            })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    /* ---------- POST ---------- */
    async burn() {
        return new Promise((resolve, reject) => {
            this.axiosClient.post('/burn')
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    async communityRequest(name, location, response1, response2, response3) {
        return new Promise((resolve, reject) => {
            this.axiosClient.post('/communityRequest', {
                communityName: name,
                communityLocation: location,
                response1: response1,
                response2: response2,
                response3: response3
            })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    async mint() {
        return new Promise((resolve, reject) => {
            this.axiosClient.post('/mint')
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    async mintMore() {
        return new Promise((resolve, reject) => {
            this.axiosClient.post('/mintMore')
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    /* ---------- PUT ---------- */
    async addAdmin(id, permissionLevel, username) {
        return new Promise((resolve, reject) => {
            this.axiosClient.put('/addAdmin', {
                communityId: id,
                permissionLevel: permissionLevel,
                username: username
            })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    async addMember(id, username) {
        return new Promise((resolve, reject) => {
            this.axiosClient.put('/addMember', { communityId: id, username: username })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    async addMultiple(id, permissionLevels, usernames) {
        return new Promise((resolve, reject) => {
            this.axiosClient.put('/addMultiple', {
                communityId: id,
                permissionLevels: permissionLevels,
                usernames: usernames
            })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    async approveCommunityRequest(requestId, verdict, initialTokenAmount) {
        return new Promise((resolve, reject) => {
            this.axiosClient.put('/addMultiple', {
                requestId: requestId,
                verdict: verdict,
                initialTokenAmount: initialTokenAmount
            })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    async removeAdmin(communityId, username) {
        return new Promise((resolve, reject) => {
            this.axiosClient.put('/removeAdmin', {
                communityId: communityId,
                username: username
            })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data))
        })
    }

    /* ---------- DELETE ---------- */
    async delete() {

    }
}

class User extends CommunityWalletExpressServerClient {
    constructor(mnemonic, password) {
        super(mnemonic, password)
        this.axiosClient.defaults.baseURL = this.axiosClient.defaults.baseURL + '/user'
    }

    /* ---------- GET ---------- */
    async balancesOneCommunity(communityCode) {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/balancesOneCommunity', { communityCode: communityCode })
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async balancesAllCommunities() {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/balancesAllCommunities')
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async getOneById(userId) {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/getOneById', { id: userId })
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async getOneByPhoneNumber(phoneNumber) {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/getOneByPhoneNumber', { phoneNumber: phoneNumber })
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async getOneByUsername(username) {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/getOneByUsername', { username: username })
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async listAllUsers() {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/listAllUsers')
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async listAllUserCommunities(phoneNumber) {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/listAllUserCommunities', { phoneNumber: phoneNumber })
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async listServices(username) {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/listServices', { username: username })
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async login(phoneNumber, password) {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/login', { password: password, phoneNumber: phoneNumber })
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async privateKey() {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/privateKey')
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async searchUsers(searchText, page, limit) {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/searchUsers', { searchText: searchText, page: page, limit: limit })
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async tokens(communityCode) {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/tokens', { communityCode: communityCode })
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    /* ---------- POST ---------- */
    async createUser(password, phoneNumber, username) {
        return new Promise((resolve, reject) => {
            this.axiosClient.post('/create', { password: password, phoneNumber: phoneNumber, username: username })
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async sendTokens(recipientAddress, transferAmount, contractAddress) {
        return new Promise((resolve, reject) => {
            this.axiosClient.post('/sendTokens', { recipientAddress: recipientAddress, transferAmount: transferAmount, contractAddress: contractAddress })
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }


    /* ---------- PUT ---------- */
    async addCommunity(communityCode) {
        return new Promise((resolve, reject) => {
            this.axiosClient.put('/addCommunity', { communityCode: communityCode })
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async updateUser(phoneNumber, username) {
        return new Promise((resolve, reject) => {
            this.axiosClient.put('/user', { phoneNumber, username })
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    // not working
    async newPassword() {
        return new Promise((resolve, reject) => {
            this.axiosClient.put('/newPassword')
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    /* ---------- DELETE ---------- */

    // not working
    async deleteUser() {
        return new Promise((resolve, reject) => {
            this.axiosClient.delete('/user')
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }
}

class Services extends CommunityWalletExpressServerClient {
    constructor(mnemonic, password) {
        super(mnemonic, password)
        this.axiosClient.defaults.baseURL = this.axiosClient.defaults.baseURL + '/service'
    }


}

export default CommunityWalletExpressServerClient