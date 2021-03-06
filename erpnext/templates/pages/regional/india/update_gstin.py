import frappe
from frappe import _

def get_context(context):
	context.no_cache = 1
	party = frappe.form_dict.party

	try:
		update_gstin(context)
	except frappe.ValidationError:
		context.invalid_gstin = 1

	party_type = 'Customer'
	party = frappe.db.get_value('Customer', party)

	if not party:
		party_type = 'Supplier'
		party = frappe.db.get_value('Supplier', party)

	if not party:
		frappe.throw(_("Not Found"), frappe.DoesNotExistError)

	context.party = frappe.get_doc(party_type, party)
	context.party.onload()


def update_gstin(context):
	dirty = False
	for key, value in frappe.form_dict.items():
		if key != 'party':
			address_name = frappe.get_value('Address', key)
			if address_name:
				address = frappe.get_doc('Address', address_name)
				address.gstin = value
				address.save(ignore_permissions=True)
				dirty = True

	if dirty:
		frappe.db.commit()
		context.updated = True
