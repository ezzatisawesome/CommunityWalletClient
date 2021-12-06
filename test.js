import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000/community'
axios.defaults.headers.common['mnemonic'] = "U2FsdGVkX1+KGrVrOwkAGXdUpgvqcFwY+/XIq8HPlSipiH41i2B8f/IJ2u3ZJulR3ZH4Wb18BzYkAATIGF9vjFmWG5TxnyYAq6bkxJkCMMobOuUfLOA9OeNKq/zZL+y7"
axios.defaults.headers.common['password'] = 'ilovelfa'