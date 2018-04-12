CREATE FUNCTION  activities.calc_kcal_min_for_run(weight_grams integer, distance_meters integer, duration_seconds integer )
    RETURNS float
    LANGUAGE plpgsql
    AS $$
    DECLARE
      mass_kg float := CAST(weight_grams as float) / 1000;
      kph float := activities.calc_kph(
                CAST(distance_meters as float) / 1000,
                CAST(duration_seconds as float) / 60 / 60
              );
      vo2 float := activities.calc_vo2_leger(kph);
    BEGIN
      RETURN (
        activities.calc_kcal_min(mass_kg, vo2, 4.86)
      );
    END $$
;
