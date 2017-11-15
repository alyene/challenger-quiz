module.exports = {
    
    crypto : require('crypto'),

	// return password  salt and hash
	setPassword : function(password) {
		salt = this.crypto.randomBytes(16).toString('hex');
		hash = this.crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha1').toString('hex');
		return { salt: salt, hash: hash };
	},

	// validate password with exsisting
	validPassword : function(password, checkObj) {
		var hash = this.crypto.pbkdf2Sync(password, checkObj.salt, 1000, 64, 'sha1').toString('hex');
		return checkObj.hash === hash;
	}

}