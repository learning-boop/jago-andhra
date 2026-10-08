<?php
/** GET → Event[] (soonest first) */
require __DIR__ . '/lib/bootstrap.php';
allow('GET');
json_out(content_list('event', 'ASC'));
