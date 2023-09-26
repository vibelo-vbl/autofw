def user_schema(user) -> dict:
    return {"id": str(user["_id"]),
            "name": user["name"],
            "surname": user["surname"],
            "username": user["username"],
            "email": user["email"],
            "organization": user["organization"],
            "disabled": bool(user["disabled"]),
            "password": str(user["password"]),
            "superadmin": bool(user["superadmin"]),
            "image": str(user["image"]),
            "admin": bool(user["admin"])
    }

def users_schema(users) -> list:
        return [user_schema(user) for user in users]
