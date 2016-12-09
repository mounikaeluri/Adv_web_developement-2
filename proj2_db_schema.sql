use jadrn034;

drop table if exists merchandise_in;
drop table if exists merchandise_out;
drop table if exists on_hand;


create table merchandise_in(sku varchar(7), mydate date, quantity int, foreign key(sku) references products(sku));
create table merchandise_out(sku varchar(7), mydate date, quantity int, foreign key(sku) references products(sku));
create table on_hand(sku varchar(7), last_date_modified date, on_hand_quantity int, foreign key(sku) references products(sku));



create table passwords(username varchar(10), password varchar(40));


insert into passwords(username,password) values ('cs645','10BF499622F9DF3035AF99794EE0C011');

insert into passwords(username,password) values ('deepu','579096FEA2B56D2A9897EA15E3971A08');

insert into passwords(username,password) values ('elu28ri','1E511BDD4F6D0563C899FB8C7670EAB4');

insert into passwords(username,password) values ('eluri','1E511BDD4F6D0563C899FB8C7670EAB4');

