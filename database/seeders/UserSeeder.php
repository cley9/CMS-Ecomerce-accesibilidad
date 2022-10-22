<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
//         12=
// $2y$10$/zwFfNZlbD.nwq4hhsL5Le1B1msGebTTUxY7hOjHmw/wioWZNMW7q

        $userAdmin=new User();
        $userAdmin->name='cley';
        $userAdmin->email='cley@gmail.com';
        $userAdmin->rol='4';
        $userAdmin->avatar='http://127.0.0.1:8000/storage/img/icons/person-circle.svg';
        $userAdmin->password=bcrypt('123456');
        // $userAdmin->password='$2y$10$/zwFfNZlbD.nwq4hhsL5Le1B1msGebTTUxY7hOjHmw/wioWZNMW7q';
        $userAdmin->save();

        $userAdmin1=new User();
        $userAdmin1->name='junior';
        $userAdmin1->email='junior@gmail.com';
        $userAdmin1->rol='4';
        $userAdmin1->avatar='http://127.0.0.1:8000/storage/img/icons/person-circle.svg';
        $userAdmin1->password=bcrypt('123456');
        // $userAdmin->password='$2y$10$/zwFfNZlbD.nwq4hhsL5Le1B1msGebTTUxY7hOjHmw/wioWZNMW7q';
        $userAdmin1->save();
        // user log rol 0
        $userLocal=new User();
        $userLocal->name='jose';
        $userLocal->email='jose@gmail.com';
        $userLocal->rol='0';
        $userAdmin->avatar='http://127.0.0.1:8000/storage/img/icons/userLogin.png';
        $userLocal->password='$2y$10$/zwFfNZlbD.nwq4hhsL5Le1B1msGebTTUxY7hOjHmw/wioWZNMW7q';
        $userLocal->save();

    }
}
