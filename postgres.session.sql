SELECT spendings.id,
    spendings.user_id,
    users.username,
    spendings.amount,
    spendings.created_at
FROM spendings
    JOIN users ON spendings.user_id = users.id