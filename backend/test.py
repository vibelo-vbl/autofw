from ldap3 import Server, Connection, ALL
server = Server('10.156.0.10', get_info=ALL)
con = Connection(server,'cn=Administrator,cn=Users,dc=test,dc=local', 'Vibelo.93!', auto_bind=True)
con.search('dc=test,dc=local', '(objectclass=person)',attributes=['unicodePwd', 'objectclass'])
con.entries[0]