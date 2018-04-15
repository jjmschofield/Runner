CREATE FUNCTION  activities.add_run_for_user(userId integer, distanceMeters integer, durationSeconds integer, runDate date)
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
          INSERT INTO activities.runs (user_id, date, distance_meters, duration_seconds)
            VALUES (userId, runDate, distanceMeters, durationSeconds)
          RETURNING
            activities.runs.id,
            activities.runs.user_id,
            activities.runs.distance_meters,
            activities.runs.duration_seconds,
            activities.runs.date
          ;
    END $$
;
