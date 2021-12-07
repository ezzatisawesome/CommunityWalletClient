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
    async balancesOneCommunity() {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/balancesOneCommunity')
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

    async getOneById() {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/getOneById')
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async getOneByPhoneNumber() {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/getOneByPhoneNumber')
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async getOneByUsername() {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/getOneByUsername')
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

    async listAllUserCommunities() {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/listAllUserCommunities')
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async listServices() {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/listServices')
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async login() {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/login')
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

    async searchUsers() {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/searchUsers')
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async tokens() {
        return new Promise((resolve, reject) => {
            this.axiosClient.get('/tokens')
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    /* ---------- POST ---------- */
    async createUser() {
        return new Promise((resolve, reject) => {
            this.axiosClient.post('/create')
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async sendTokens() {
        return new Promise((resolve, reject) => {
            this.axiosClient.post('/sendTokens')
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }


    /* ---------- PUT ---------- */
    async addCommunity() {
        return new Promise((resolve, reject) => {
            this.axiosClient.put('/addCommunity')
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async updateUser() {
        return new Promise((resolve, reject) => {
            this.axiosClient.put('/user')
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    async newPassword() {
        return new Promise((resolve, reject) => {
            this.axiosClient.put('/newPassword')
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }

    /* ---------- DELETE ---------- */
    async deleteUser() {
        return new Promise((resolve, reject) => {
            this.axiosClient.delete('/user')
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data))
    }
}

export default CommunityWalletExpressServerClient