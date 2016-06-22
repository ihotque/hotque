hotque is a teamwork tool

nodejs + nginx + mongodb


1. login
1.1 account_name@domain_name + account_password
1.2 the authority of account is set by domain master.

2. domain
2.1 domain is created by domain owner.
2.2 domain owner can specify domain master.
2.3 domain master can manage domain member and activities, aka account, but can not change domain properties.
2.4 either owner or masters needs personal confirm.
2.5 domain has only one owner, but can has multiple masters.

3. create account with new domain
3.1 domain, owner and account are created at same time.
3.2 Personal check is required. By now, email and password are necessary.

4. create account with existed domain
4.1 you should be domain owner, so email and password are necessary.
4.2 you should set property of the new account.
4.3 if you want to set this account as domain master, this account need personal check.

5. personal check
5.1 either owner or masters needs personal confirm.
5.2 many methods: email confirm, mobile confirm, certificate paper(driver liscense, passport and so on) or other web site account.


