---
layout: default
title: Inner and Outer Joins
---

# Inner and Outer Joins

Nothing is more confounding to AIS students than inner and outer joins. To understand them, let’s look at some sample data in two tables from the sales process.

The first table is `tblShipProduct`. It records shipments to customers.

## tblShipProduct

| Shipping# | Shipping Date | Customer# | Sales Order# | Shipment Amount |
|---:|---|---:|---:|---:|
| 1001 | 2026-04-01 | 201 | 5001 | 1,250 |
| 1002 | 2026-04-03 | 202 | 5002 | 2,400 |
| 1003 | 2026-04-05 | 203 | 5003 | 875 |
| 1004 | 2026-04-07 | 204 | 5004 | 3,100 |
| 1005 | 2026-04-08 | 205 | 5005 | 1,760 |
| 1006 | 2026-04-10 | 206 | 5006 | 950 |
| 1007 | 2026-04-12 | 207 | 5007 | 4,200 |

The second table is `tblReceiveCash`. It records cash receipts from customers. Notice that `Shipping#` appears in this table as a foreign key. It connects a cash receipt back to the shipment being paid.

Also notice something important: **not all shipments have been paid for**.

## tblReceiveCash

| Receipt# | Receipt Date | Shipping# | Customer# | Payment Method | Receipt Amount |
|---:|---|---:|---:|---|---:|
| 9001 | 2026-04-06 | 1001 | 201 | Check | 1,250 |
| 9002 | 2026-04-09 | 1002 | 202 | ACH | 1,400 |
| 9003 | 2026-04-11 | 1002 | 202 | ACH | 1,000 |
| 9004 | 2026-04-13 | 1004 | 204 | Credit Card | 3,100 |
| 9005 | 2026-04-15 | 1005 | 205 | Check | 1,760 |
| 9006 | 2026-04-16 | 1007 | 207 | ACH | 2,000 |
| 9007 | 2026-04-18 | 1007 | 207 | ACH | 2,200 |

Shipments `1003` and `1006` do not appear in `tblReceiveCash`. That means those shipments have not been paid for yet.

## Inner Join

If we join these two tables with an **inner join**, we can find shipments for which we have received at least one payment.

An inner join returns only the records that match in both tables.

In this case, a shipment must exist in `tblShipProduct`, and there must also be a matching receipt in `tblReceiveCash`.

```sql
SELECT
    tblShipProduct.[Shipping#],
    tblReceiveCash.[Receipt#],
    tblReceiveCash.[Receipt Amount]
FROM
    tblShipProduct
INNER JOIN
    tblReceiveCash
ON
    tblShipProduct.[Shipping#] = tblReceiveCash.[Shipping#];
```

**Query View: Inner Join**

| Shipping# | Receipt# | Receipt Amount |
|---:|---:|---:|
| 1001 | 9001 | 1,250 |
| 1002 | 9002 | 1,400 |
| 1002 | 9003 | 1,000 |
| 1004 | 9004 | 3,100 |
| 1005 | 9005 | 1,760 |
| 1007 | 9006 | 2,000 |
| 1007 | 9007 | 2,200 |

This result tells us which shipments have related cash receipts. Notice that shipment `1002` appears twice because it had two payments. Shipment `1007` also appears twice for the same reason. 

Also notice that shipments `1003` and `1006` do not appear at all. They are in the shipment table, but they do not have matching records in the cash receipt table. Because an inner join only keeps matching records, those unpaid shipments are excluded.

## Outer Join

What if we want to see the shipments that have not been paid for? Now we need an outer join. 

More specifically, we need a **left outer join**. A left outer join keeps all records from the first table listed in the query, even if there is no matching record in the second table. 

Here, we want to keep all shipments from `tblShipProduct`, whether or not they have related cash receipts.

```sql
SELECT
    tblShipProduct.[Shipping#],
    tblShipProduct.[Shipping Date],
    tblShipProduct.[Customer#],
    tblShipProduct.[Shipment Amount],
    tblReceiveCash.[Receipt#],
    tblReceiveCash.[Receipt Amount]
FROM
    tblShipProduct
LEFT JOIN
    tblReceiveCash
ON
    tblShipProduct.[Shipping#] = tblReceiveCash.[Shipping#];
```

**Query View: Left Outer Join**

| Shipping# | Shipping Date | Customer# | Shipment Amount | Receipt# | Receipt Amount |
|---:|---|---:|---:|---:|---:|
| 1001 | 2026-04-01 | 201 | 1,250 | 9001 | 1,250 |
| 1002 | 2026-04-03 | 202 | 2,400 | 9002 | 1,400 |
| 1002 | 2026-04-03 | 202 | 2,400 | 9003 | 1,000 |
| 1003 | 2026-04-05 | 203 | 875 | | |
| 1004 | 2026-04-07 | 204 | 3,100 | 9004 | 3,100 |
| 1005 | 2026-04-08 | 205 | 1,760 | 9005 | 1,760 |
| 1006 | 2026-04-10 | 206 | 950 | | |
| 1007 | 2026-04-12 | 207 | 4,200 | 9006 | 2,000 |
| 1007 | 2026-04-12 | 207 | 4,200 | 9007 | 2,200 |

This query keeps every shipment, even when there is no matching cash receipt. For shipments `1003` and `1006`, the receipt fields are blank. In database terms, those values are `NULL`. That means there was no matching record in `tblReceiveCash`.

## Finding Only the Unpaid Shipments

The left outer join above shows all shipments. But what if we want to see **only** the shipments that have not been paid? 

We can add a `WHERE` clause that keeps only the rows where the receipt number is missing.

```sql
SELECT
    tblShipProduct.[Shipping#],
    tblShipProduct.[Shipping Date],
    tblShipProduct.[Customer#],
    tblShipProduct.[Shipment Amount],
    tblReceiveCash.[Receipt#],
    tblReceiveCash.[Receipt Amount]
FROM
    tblShipProduct
LEFT JOIN
    tblReceiveCash
ON
    tblShipProduct.[Shipping#] = tblReceiveCash.[Shipping#]
WHERE
    tblReceiveCash.[Receipt#] IS NULL;
```

**Query View: Unpaid Shipments**

| Shipping# | Shipping Date | Customer# | Shipment Amount | Receipt# | Receipt Amount |
|---:|---|---:|---:|---:|---:|
| 1003 | 2026-04-05 | 203 | 875 | | |
| 1006 | 2026-04-10 | 206 | 950 | | |

This final query is useful because it answers an important business question: **Which shipments have not yet been paid for?** In an accounting information system, that question matters. It can help a company follow up with customers, investigate collection issues, and monitor accounts receivable.

## The Main Difference

The difference between an inner join and an outer join is simple once you focus on what each one keeps.

* **An inner join** keeps only matching records.
* **A left outer join** keeps all records from the left table and adds matching records from the right table when they exist.

In this example:
* The inner join shows shipments that have received payments.
* The left outer join shows all shipments, including those with no payment.
* The left outer join with `WHERE Receipt# IS NULL` shows only unpaid shipments.

When you are working with accounting data, joins are not just technical database tools. They help answer practical accounting questions. Did we ship the product? Did we receive the cash? Which shipments are still unpaid? Which records match, and which records do not? 
