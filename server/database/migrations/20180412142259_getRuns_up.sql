CREATE FUNCTION  activities.select_runs_for_user(requestedUserId integer)
    RETURNS TABLE(
        id integer,
        user_id integer,
        distance_meters integer,
        duration_seconds integer,
        date date
    )
    LANGUAGE plpgsql
    AS $$
    BEGIN
        RETURN QUERY
          SELECT
            activities.runs.id as id,
            activities.runs.user_id as user_id,
            activities.runs.distance_meters as distance_meters,
            activities.runs.duration_seconds as duration_seconds,
            activities.runs.date as date
          FROM activities.runs
          WHERE activities.runs.user_id = requestedUserId;
    END $$
;
