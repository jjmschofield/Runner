CREATE FUNCTION  activities.select_runs_for_user(requestedUserId integer)
    RETURNS TABLE(
        id integer,
        user_id integer,
        distance_meters integer,
        duration_seconds integer,
        date date,
        k_cal_min float
    )
    LANGUAGE plpgsql
    AS $$
    BEGIN
        RETURN QUERY
          SELECT
            activities.runs_calcs_view.id as id,
            activities.runs_calcs_view.user_id as user_id,
            activities.runs_calcs_view.distance_meters as distance_meters,
            activities.runs_calcs_view.duration_seconds as duration_seconds,
            activities.runs_calcs_view.date as date,
            activities.runs_calcs_view.k_cal_min as k_cal_min
          FROM activities.runs_calcs_view
          WHERE activities.runs_calcs_view.user_id = requestedUserId;
    END $$
;
