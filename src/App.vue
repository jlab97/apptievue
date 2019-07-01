<template>
    <div id="app">
        <b-navbar toggleable="lg" type="light" variant="light">
            <b-navbar-brand href="#">AppTie</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/">Home</b-nav-item>
                    <b-nav-item to="/products">productos</b-nav-item>
                    <b-nav-item to="/brands">marcas</b-nav-item>
                    <b-nav-item to="/types">categorias</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template slot="button-content"><em>User</em></template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    <b-container>
        <router-view/>
    </b-container>
    </div>
</template>
