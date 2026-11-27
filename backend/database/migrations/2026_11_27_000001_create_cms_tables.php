<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_contents', function (Blueprint $table) {
            $table->id();
            $table->string('title')->default('About');
            $table->string('heading');
            $table->string('image')->default('/img/about.jpg');
            $table->string('alt')->default('About Charitize Non-Profit Organization');
            $table->text('description');
            $table->string('founder_name');
            $table->string('founder_role');
            $table->text('founder_bio');
            $table->string('mission_title')->default('Our Mission');
            $table->text('mission_description');
            $table->json('mission_points');
            $table->text('callout_text');
            $table->string('callout_button_text')->default('Donate Now');
            $table->timestamps();
        });

        Schema::create('causes', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->string('title');
            $table->unsignedInteger('raised')->default(0);
            $table->unsignedInteger('goal')->default(1000);
            $table->string('img_src')->default('/img/donation-1.jpg');
            $table->text('description');
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role');
            $table->string('title')->nullable();
            $table->string('image')->default('/img/team-1.jpg');
            $table->boolean('is_lead')->default(false);
            $table->text('bio');
            $table->json('badges')->nullable();
            $table->json('social')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cause_id')->nullable()->constrained('causes')->nullOnDelete();
            $table->string('cause_title')->nullable();
            $table->string('donor_name');
            $table->string('donor_email');
            $table->decimal('amount', 10, 2);
            $table->string('payment_intent_id')->nullable();
            $table->string('status')->default('succeeded');
            $table->timestamps();
        });

        Schema::create('newsletter_subscribers', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('newsletter_subscribers');
        Schema::dropIfExists('donations');
        Schema::dropIfExists('team_members');
        Schema::dropIfExists('causes');
        Schema::dropIfExists('about_contents');
    }
};

