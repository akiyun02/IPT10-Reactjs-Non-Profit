<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Charitize CMS &mdash; Laravel Headless Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background: #f4f6f9; }
        .navbar-brand { font-weight: 700; letter-spacing: .5px; }
        .card { border: none; box-shadow: 0 2px 10px rgba(0,0,0,.05); }
        .stat-card { border-left: 4px solid #1A685B; }
    </style>
</head>
<body>
<nav class="navbar navbar-dark bg-dark mb-4">
    <div class="container">
        <span class="navbar-brand">Charitize Headless CMS</span>
        <div class="d-flex gap-2">
            <a href="/api/cms/health" target="_blank" class="btn btn-outline-light btn-sm">API Health</a>
            <a href="http://localhost:5173" target="_blank" class="btn btn-warning btn-sm fw-semibold">Open React Frontend &rarr;</a>
        </div>
    </div>
</nav>

<div class="container pb-5">
    @if (session('status'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            {{ session('status') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    @endif

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul class="mb-0">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <!-- Stats Row -->
    <div class="row g-3 mb-4">
        <div class="col-md-3">
            <div class="card stat-card p-3">
                <small class="text-muted text-uppercase">Active Causes</small>
                <h3 class="mb-0 fw-bold">{{ $causes->where('is_active', true)->count() }}</h3>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card stat-card p-3">
                <small class="text-muted text-uppercase">Team Members</small>
                <h3 class="mb-0 fw-bold">{{ $members->where('is_active', true)->count() }}</h3>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card stat-card p-3">
                <small class="text-muted text-uppercase">Recorded Donations</small>
                <h3 class="mb-0 fw-bold">${{ number_format($totalDonated, 2) }}</h3>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card stat-card p-3">
                <small class="text-muted text-uppercase">Newsletter Subscribers</small>
                <h3 class="mb-0 fw-bold">{{ $subscribers->count() }}</h3>
            </div>
        </div>
    </div>

    <!-- Navigation Tabs -->
    <ul class="nav nav-tabs mb-4" id="cmsTabs" role="tablist">
        <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-causes" type="button">Causes ({{ $causes->count() }})</button></li>
        <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-team" type="button">Team ({{ $members->count() }})</button></li>
        <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-about" type="button">About &amp; Mission</button></li>
        <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-donations" type="button">Donations &amp; Subscribers</button></li>
    </ul>

    <div class="tab-content">
        <!-- CAUSES TAB -->
        <div class="tab-pane fade show active" id="tab-causes">
            <div class="card p-4 mb-4">
                <h5 class="mb-3">Add New Cause</h5>
                <form method="POST" action="{{ route('cms.causes.store') }}" class="row g-3">
                    @csrf
                    <div class="col-md-3"><input type="text" name="category" class="form-control" placeholder="Category (e.g. Nutrition)" required></div>
                    <div class="col-md-4"><input type="text" name="title" class="form-control" placeholder="Cause Title" required></div>
                    <div class="col-md-2"><input type="number" name="raised" class="form-control" placeholder="Raised $" value="0" min="0" required></div>
                    <div class="col-md-3"><input type="number" name="goal" class="form-control" placeholder="Goal $" value="5000" min="1" required></div>
                    <div class="col-md-4"><input type="text" name="img_src" class="form-control" value="/img/donation-1.jpg" required></div>
                    <div class="col-md-6"><input type="text" name="description" class="form-control" placeholder="Short description" required></div>
                    <div class="col-md-2"><button class="btn btn-primary w-100" type="submit">Add Cause</button></div>
                </form>
            </div>

            <div class="row g-3">
                @foreach ($causes as $cause)
                    <div class="col-md-4">
                        <div class="card p-3 h-100">
                            <form method="POST" action="{{ route('cms.causes.update', $cause) }}">
                                @csrf
                                @method('PUT')
                                <div class="mb-2">
                                    <label class="form-label small fw-bold">Category</label>
                                    <input type="text" name="category" class="form-control form-control-sm" value="{{ $cause->category }}" required>
                                </div>
                                <div class="mb-2">
                                    <label class="form-label small fw-bold">Title</label>
                                    <input type="text" name="title" class="form-control form-control-sm" value="{{ $cause->title }}" required>
                                </div>
                                <div class="row g-2 mb-2">
                                    <div class="col-6">
                                        <label class="form-label small fw-bold">Raised ($)</label>
                                        <input type="number" name="raised" class="form-control form-control-sm" value="{{ $cause->raised }}" min="0" required>
                                    </div>
                                    <div class="col-6">
                                        <label class="form-label small fw-bold">Goal ($)</label>
                                        <input type="number" name="goal" class="form-control form-control-sm" value="{{ $cause->goal }}" min="1" required>
                                    </div>
                                </div>
                                <div class="mb-2">
                                    <label class="form-label small fw-bold">Description</label>
                                    <textarea name="description" class="form-control form-control-sm" rows="2" required>{{ $cause->description }}</textarea>
                                </div>
                                <div class="form-check mb-3">
                                    <input class="form-check-input" type="checkbox" name="is_active" value="1" id="cause_active_{{ $cause->id }}" {{ $cause->is_active ? 'checked' : '' }}>
                                    <label class="form-check-label small" for="cause_active_{{ $cause->id }}">Visible on Frontend</label>
                                </div>
                                <button type="submit" class="btn btn-success btn-sm w-100">Save Changes</button>
                            </form>
                            <form method="POST" action="{{ route('cms.causes.destroy', $cause) }}" class="mt-2" onsubmit="return confirm('Delete this cause?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-outline-danger btn-sm w-100">Delete</button>
                            </form>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        <!-- TEAM TAB -->
        <div class="tab-pane fade" id="tab-team">
            <div class="card p-4 mb-4">
                <h5 class="mb-3">Add Team Member</h5>
                <form method="POST" action="{{ route('cms.team.store') }}" class="row g-3">
                    @csrf
                    <div class="col-md-3"><input type="text" name="name" class="form-control" placeholder="Full Name" required></div>
                    <div class="col-md-3"><input type="text" name="role" class="form-control" placeholder="Role" required></div>
                    <div class="col-md-2"><input type="text" name="title" class="form-control" placeholder="Badge Title"></div>
                    <div class="col-md-4"><input type="text" name="image" class="form-control" value="/img/team-2.jpg" required></div>
                    <div class="col-md-4"><input type="text" name="badges_csv" class="form-control" placeholder="Badges (comma separated)"></div>
                    <div class="col-md-3"><input type="email" name="email" class="form-control" placeholder="Email"></div>
                    <div class="col-md-5"><input type="text" name="bio" class="form-control" placeholder="Short Bio" required></div>
                    <div class="col-md-12"><button class="btn btn-primary" type="submit">Add Member</button></div>
                </form>
            </div>

            <div class="row g-3">
                @foreach ($members as $member)
                    <div class="col-md-4">
                        <div class="card p-3 h-100">
                            <form method="POST" action="{{ route('cms.team.update', $member) }}">
                                @csrf
                                @method('PUT')
                                <div class="mb-2">
                                    <label class="form-label small fw-bold">Name</label>
                                    <input type="text" name="name" class="form-control form-control-sm" value="{{ $member->name }}" required>
                                </div>
                                <div class="mb-2">
                                    <label class="form-label small fw-bold">Role</label>
                                    <input type="text" name="role" class="form-control form-control-sm" value="{{ $member->role }}" required>
                                </div>
                                <div class="mb-2">
                                    <label class="form-label small fw-bold">Tag / Title</label>
                                    <input type="text" name="title" class="form-control form-control-sm" value="{{ $member->title }}">
                                </div>
                                <div class="mb-2">
                                    <label class="form-label small fw-bold">Badges (comma separated)</label>
                                    <input type="text" name="badges_csv" class="form-control form-control-sm" value="{{ implode(', ', $member->badges ?? []) }}">
                                </div>
                                <div class="mb-2">
                                    <label class="form-label small fw-bold">Bio</label>
                                    <textarea name="bio" class="form-control form-control-sm" rows="3" required>{{ $member->bio }}</textarea>
                                </div>
                                <div class="form-check mb-3">
                                    <input class="form-check-input" type="checkbox" name="is_active" value="1" id="member_active_{{ $member->id }}" {{ $member->is_active ? 'checked' : '' }}>
                                    <label class="form-check-label small" for="member_active_{{ $member->id }}">Visible on Frontend</label>
                                </div>
                                <button type="submit" class="btn btn-success btn-sm w-100">Save Member</button>
                            </form>
                            <form method="POST" action="{{ route('cms.team.destroy', $member) }}" class="mt-2" onsubmit="return confirm('Remove this team member?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-outline-danger btn-sm w-100">Remove</button>
                            </form>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        <!-- ABOUT TAB -->
        <div class="tab-pane fade" id="tab-about">
            @if ($about)
                <div class="card p-4">
                    <h5 class="mb-3">Edit About &amp; Mission Content</h5>
                    <form method="POST" action="{{ route('cms.about.update') }}" class="row g-3">
                        @csrf
                        <div class="col-md-4">
                            <label class="form-label fw-bold small">Section Title</label>
                            <input type="text" name="title" class="form-control" value="{{ $about->title }}" required>
                        </div>
                        <div class="col-md-8">
                            <label class="form-label fw-bold small">Main Heading</label>
                            <input type="text" name="heading" class="form-control" value="{{ $about->heading }}" required>
                        </div>
                        <div class="col-12">
                            <label class="form-label fw-bold small">Description</label>
                            <textarea name="description" class="form-control" rows="3" required>{{ $about->description }}</textarea>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold small">Founder Name</label>
                            <input type="text" name="founder_name" class="form-control" value="{{ $about->founder_name }}" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold small">Founder Role</label>
                            <input type="text" name="founder_role" class="form-control" value="{{ $about->founder_role }}" required>
                        </div>
                        <div class="col-12">
                            <label class="form-label fw-bold small">Founder Bio</label>
                            <textarea name="founder_bio" class="form-control" rows="2" required>{{ $about->founder_bio }}</textarea>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label fw-bold small">Mission Title</label>
                            <input type="text" name="mission_title" class="form-control" value="{{ $about->mission_title }}" required>
                        </div>
                        <div class="col-md-8">
                            <label class="form-label fw-bold small">Mission Description</label>
                            <input type="text" name="mission_description" class="form-control" value="{{ $about->mission_description }}" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold small">Mission Points (one per line)</label>
                            <textarea name="mission_points_text" class="form-control" rows="4">{{ implode("\n", $about->mission_points ?? []) }}</textarea>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold small">Donation Callout Text</label>
                            <textarea name="callout_text" class="form-control" rows="4" required>{{ $about->callout_text }}</textarea>
                        </div>
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary px-4">Save About Content</button>
                        </div>
                    </form>
                </div>
            @endif
        </div>

        <!-- DONATIONS & SUBSCRIBERS TAB -->
        <div class="tab-pane fade" id="tab-donations">
            <div class="row g-4">
                <div class="col-md-8">
                    <div class="card p-4">
                        <h5 class="mb-3">Recent Donations</h5>
                        <div class="table-responsive">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Donor</th>
                                        <th>Cause</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse ($donations as $donation)
                                        <tr>
                                            <td>{{ $donation->donor_name }} <br><small class="text-muted">{{ $donation->donor_email }}</small></td>
                                            <td>{{ $donation->cause_title ?? 'General Support' }}</td>
                                            <td class="fw-bold text-success">${{ number_format($donation->amount, 2) }}</td>
                                            <td class="small text-muted">{{ $donation->created_at->format('M d, Y H:i') }}</td>
                                        </tr>
                                    @empty
                                        <tr><td colspan="4" class="text-muted text-center py-3">No donations recorded yet.</td></tr>
                                    @endforelse
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card p-4">
                        <h5 class="mb-3">Newsletter Subscribers</h5>
                        <ul class="list-group list-group-flush">
                            @forelse ($subscribers as $sub)
                                <li class="list-group-item px-0 small d-flex justify-content-between">
                                    <span>{{ $sub->email }}</span>
                                    <span class="text-muted">{{ $sub->created_at->format('M d') }}</span>
                                </li>
                            @empty
                                <li class="list-group-item px-0 text-muted small">No subscribers yet.</li>
                            @endforelse
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

