---
title: "💻 hibp %pw%"
description: "Lookup der fetcher Have I Been Pwned's API, for at se om vores adganskoder har været lækket."
date: 2020-11-12
image: "./hibp-lookup.webp"
tags:
  - shell
  - scripts
---

command `hibp` 

output `Input password to lookup: `

----
command `hibp aE0UkxZV5FWkW 	# (ikke tidligere lækket)`  

output `Keep up the good work!`

----

command `hibp kanye2020			# (lækket pw)` 

output `Ouch! The password you input has been leaked! Times found: 48. A new secure password has been copied to your clipboard.`

----

```bash
#!/usr/bin/env bash

password=$1

getPassword(){
	if [ -z "$password" ]
	then
		clear
		printf "$(figlet "HAVE I BEEN PWNED")\n--------------------------------\n\n"
		echo "Password to lookup:"
		read -r password
fi
}

getHash(){
	hash=$(echo -n "$password" | openssl sha1)
	hash=${hash:9}
	range=${hash:0:5}
	remainder=${hash:6}
}

apiRequest(){
	apiUrl="https://api.pwnedpasswords.com/range/$range"
	filename="$PWD/.pwned.hash"
	results=$(curl -s "$apiUrl" > "$filename" && grep -i "$remainder" "$filename")
	noTimes="${results:36}"
	if [ -z "$results" ]
	then
		clear
		printf "$(figlet "NOT PWNED")\n--------------------------------\n\n"
		printf "Keep up the good work!"
	else
		clear
		printf "$(figlet "YOU HAVE BEEN PWNED")\n--------------------------------\n\n"
		printf "Ouch...!\nThe password you input has been leaked!\n\nTimes found: $noTimes\nYou might want to change that!\n\n"
		newPassword
	fi
}

clean(){
	rm "$filename"
}

newPassword(){
	PASSWORD=$(openssl rand -base64 32)
	echo "${PASSWORD%??}" | xclip -selection c
	echo "A new random password has been copied to your clip board."
}
getPassword
getHash
apiRequest
clean
```
