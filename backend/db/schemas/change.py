# def change_schema(change) -> dict:
#     return {"id": str(change["_id"]),
#             "title": change["title"],
#             "start": change["start"],
#             "end": change["end"],
#             "number": change["number"],
#             "requested_by": change["requested_by"],
#             "category": change["category"],
#             "company": change["company"],
#             "service_offering": change["service_offering"],
#             "configuration_item": change["configuration_item"],
#             "priority": change["priority"],
#             "risk": change["risk"],
#             "impact": change["impact"],
#             "assigment_group": change["assigment_group"],
#             "assigned_to": change["assigned_to"],
#             "description": change["description"],
#     }

# def changes_schema(changes) -> list:
#         return [change_schema(change) for change in changes]


def change_schema(change) -> dict:
    return {"id": str(change["_id"]),
            "title": change["title"],
            "start": change["start"].isoformat(),
            "end": change["end"].isoformat(),
            "extendedProps": {
            "number": change["extendedProps"]["number"],
            "description": change["extendedProps"]["description"],
            "assigment_group": change["extendedProps"]["assigment_group"],
            "assigned_to": change["extendedProps"]["assigned_to"],
            "category": change["extendedProps"]["category"],
            "company": change["extendedProps"]["company"],
            "priority": change["extendedProps"]["priority"],
            "risk": change["extendedProps"]["risk"],
            "impact": change["extendedProps"]["impact"],
            "service_offering": change["extendedProps"]["service_offering"],
            "configuration_item": change["extendedProps"]["configuration_item"],
            "requested_by": change["extendedProps"]["requested_by"],
    }    
    }

def changes_schema(changes) -> list:
        return [change_schema(change) for change in changes]