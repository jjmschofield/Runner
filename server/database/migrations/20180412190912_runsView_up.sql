CREATE VIEW  activities.runs_calcs_view AS
  SELECT
    activities.runs.id as id,
    activities.runs.user_id as user_id,
    activities.runs.date as date,
    activities.runs.distance_meters as distance_meters,
    activities.runs.duration_seconds as duration_seconds,
    activities.calc_kcal_min_for_run(users.user_bios.weight_grams, activities.runs.distance_meters, activities.runs.duration_seconds) as k_cal_min
	FROM activities.runs
  JOIN users.user_bios ON users.user_bios.user_id = activities.runs.user_id;
