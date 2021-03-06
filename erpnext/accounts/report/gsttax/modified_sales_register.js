frappe.query_reports["Modified Sales Register"] = {
	"filters": [
		{
			"fieldname":"from_date",
			"label": "From Date",
			"fieldtype": "Date",
			"default": frappe.defaults.get_user_default("year_start_date"),
			"width": "80"
		},
		{
			"fieldname":"to_date",
			"label": "To Date",
			"fieldtype": "Date",
			"default": get_today()
		},
		{
			"fieldname":"account",
			"label": "Account",
			"fieldtype": "Link",
			"options": "Account",
			"get_query": function() {
				var company = frappe.query_report.filters_by_name.company.get_value();
				return {
					"query": "accounts.utils.get_account_list",
					"filters": {
						"is_pl_account": "No",
						"debit_or_credit": "Debit",
						"company": company,
						"master_type": "Customer"
					}
				}
			}
		},
		{
			"fieldname":"TAX_Amount",
			"label": "tax amount",
			"fieldtype": "Link",
			"options": "tax",
			"default": sys_defaults.company
		}
	]
}