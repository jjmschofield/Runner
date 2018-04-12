CREATE FUNCTION  users.select_user_profile_and_bio(requestedUserId integer)
    RETURNS TABLE(
        id integer,
        profile_given_name varchar,
        profile_family_name varchar,
        profile_avatar_url varchar,
        profile_dob date,
        bios_weight integer
    )
    LANGUAGE plpgsql
    AS $$
    BEGIN
        RETURN QUERY
            SELECT
				users.id as id,
				user_profiles.given_name as profile_given_name,
				user_profiles.family_name as profile_family_name,
				user_profiles.avatar_url as profile_avatar_url,
				user_profiles.dob as profile_dob,
				user_bios.weight_grams as bios_weight_grams
			FROM users.users
			JOIN users.user_profiles ON users.users.id = users.user_profiles.user_id
			JOIN users.user_bios ON users.users.id = users.user_bios.user_id
			WHERE users.users.id = requestedUserId;
    END $$
;