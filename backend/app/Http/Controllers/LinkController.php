<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LinkController extends Controller
{
    public function index() { return Link::all(); }

    public function store(Request $request) {
        $validated = $request->validate(['original_url' => 'required|url']);
        $validated['short_code'] = Str::random(6);
        return Link::create($validated);
    }

    public function show(Link $link) { return $link; }

    public function destroy(Link $link) { $link->delete(); return response()->noContent(); }

    public function redirect(string $short_code) {
        $link = Link::where('short_code', $short_code)->firstOrFail();
        $link->increment('clicks');
        return redirect($link->original_url);
    }
}