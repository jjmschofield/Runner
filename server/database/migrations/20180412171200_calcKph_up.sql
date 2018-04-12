CREATE FUNCTION  activities.calc_kph(kilometers float, hours float)
    RETURNS float
    LANGUAGE plpgsql
    AS $$
    BEGIN
      RETURN kilometers / hours;
    END $$
;
